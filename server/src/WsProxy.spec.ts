import SocketIO, {Socket} from "socket.io";
import Http from "http";
import SocketIOClient from "socket.io-client";
import {WsProxy} from "./WsProxy";

describe("WsProxy", () => {
    describe("Working with registry", () => {
        it("Should register socket on connection", (done) => {
            const store = new Map();

            const {connectServer, connectClient} = createHelpers();
            const server = connectServer();
            const proxy = new WsProxy(server, store);

            proxy.init();

            connectClient().on("connected", (id) => {
                expect(store.has(id)).toBeTruthy();
                done();
            })
        });

        it("Should detach socket from store on disconnect", (done) => {
            function createStore() {
                const in_memory_store:Map<string, Socket> = new Map();

                return {
                    set: (key, value) => {
                        in_memory_store.set(key, value)
                    },
                    delete: (key) =>  {
                        done();
                        in_memory_store.delete(key);
                    },
                }
            }

            const {connectServer, connectClient} = createHelpers();
            const server = connectServer();
            const proxy = new WsProxy(server, createStore());

            proxy.init();

            const client = connectClient();
            client.emit("end", {});
        })
    })
});

function createHelpers() {
    const http_server = Http.createServer();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { address, port } = http_server.listen().address();

    const io_options =  {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false,
    };

    const connectServer = () => new SocketIO(http_server, io_options);
    const connectClient = () => SocketIOClient.connect(`http://[${address}]:${port}`, {
        transports: ["websocket"],
    });

    const closeHttpServer = () => http_server.close();

    return {
        connectServer,
        connectClient,
        closeHttpServer,
    }
}

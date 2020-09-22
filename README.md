# posix_ws_chat_server

To run webserver enter

`docker build -t 1.0.0 . && docker run -p 80:80 -p 443:443 -v ./ws_chat/:/www/ --name posix_ws_nginx 1.0.0  `

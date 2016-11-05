# 微信webApp

* 初始化
    ```shell
    npm install
    ```

* 运行(开发)
    ```shell
    npm run dev
    ```

* 打包
    ```shell
    npm run build 
    ```

# 连接服务器

* 修改host如下
    ```host
    127.0.0.1	www.itourbag.com
    ::1	        www.itourbag.com
    ``` 

* 启动nginx配置(配置如下)
    ```nginx
    server{
        listen  80;
        server_name 0.0.0.0;
        #前端本地端口
        location / {
            proxy_pass   http://127.0.0.1:8989;
        }
        #服务器地址:端口
        location /api {
            proxy_pass   http://127.0.0.1:8080/tb_webserver;
        }
    }
    ```
* 访问 [http://www.itourbag.com](http://www.itourbag.com) 即可

# 构建阶段
FROM node:18-alpine as build-stage

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build:prod

# 生产阶段
FROM nginx:stable-alpine as production-stage

# 复制自定义的 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建结果到 nginx 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 4002

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
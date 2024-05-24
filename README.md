
# Lambda NodeJs template v0.1

### Tags
- Lambda
- AWS
- Serverless
- Template
- Node js
- Typescript
- Dynamodb

### Requirements
- [Node.js 20.11.0 with npm](https://nodejs.org/en/download/releases/)

### Deploy offline mode

1. Instalar dependencias
    - ```npm install```
2. Create dynamo db local with docker
   - ```docker run -d -p 8000:8000 --name dynamo-local amazon/dynamodb-local```
3. Create .env
    - Tomar como referencia el archivo .env.example
    - Completar credenciales y datos solicitados
4. Correr comando
    - ```npm run dev```


### Deploy aws mode
1. Instalar dependencias
   - ```npm install```
2. Create .env
   - Tomar como referencia el archivo .env.example
   - Completar credenciales y datos solicitados
3. Configurar variables en serverless.yml según preferencia
   - region: 'xxxxxxxxx'
   - profile: 'xxxxx'
4. Correr comando
   - ```npm run deploy```





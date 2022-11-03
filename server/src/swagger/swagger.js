import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
	swaggerDefinition:{
    	openapi: "3.0.0",
        info:{
        	title: 'CodeStates_Project2 <fantastic4>',
            version: '1.0.0',
            description: '판타스틱4 Node.js Swagger 방식 RestFul API 클라이어트 UI',
        },
        basePath: '/',
        servers:[
        	{
            	url:"http://localhost:3005",
            },
       ],
	},
    apis:['./src/routes/*.js', './src/models/*.js']
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs }
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cors from 'cors';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Todo: remove on production usage
    app.use(cors());

    const options = new DocumentBuilder()
        .setTitle('Todo API')
        .setDescription('Holds Todos and Shadows')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}

bootstrap();

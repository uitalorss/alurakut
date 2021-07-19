
export default async function recebeRequest(request, response){
    const { SiteClient } = require('datocms-client');
    const TOKEN = '1f4fa7afa9df88bf3b63dd59cd5605';
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
        itemType: '977456',
        ...request.body,
    })

    console.log(registroCriado);

    response.json({
        dado: 'algum dado',
        registroCriado: registroCriado,
    })
}
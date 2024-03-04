const apiURL = "http://localhost:8000/api/sucursales/estados";

export default async function getEstadosSucursales() {
    const res = await fetch(apiURL);
    const response = await res.json();
    console.log('response: ', response)
    const columnsTitles = response.map(title => title.title);
    const datas = response.map((data) => data.data);
    console.log('columnsTitles: ', columnsTitles);
    console.log('datas: ', datas);
    return { columnsTitles, datas };
}
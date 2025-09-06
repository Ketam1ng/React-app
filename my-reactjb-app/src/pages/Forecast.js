import { useState,useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function Forecast(){
    const [forecast,setForecast] = useState([]);
    const getForecast = async ()=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&appid=09a71427c59d38d6a34f89b47d75975c&units=metric`;
            const rs = await fetch(url);
            const data = await rs.json();
            const list = Array.isArray(data?.list) ? data.list : [];
            setForecast(list);
        } catch (error) {

        }
    } 
    useEffect(()=>{
        // call api  lấy dữ liệu dự báo thời tiết 5 ngày
        getForecast();
    },[]);
    return (
        <Container>
        <h1>5-day Weather Forecast</h1>
        <p>This is a 5-day weather forecast page.</p>
        <Row>
            {
                forecast.map((item,index)=>{
                    return (
                    <Col key={index} md={4} className="mb-3" xs={12} lg={3}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item?.dt_txt || ""}</Card.Title>
                                <Card.Text>
                                    {item?.weather?.[0]?.icon && (
                                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item?.weather?.[0]?.description || "weather"} />
                                    )}
                                    <p>Temp: {item?.main?.temp ?? "-"} °C</p>
                                    <p>Humidity: {item?.main?.humidity ?? "-"} %</p>
                                    <p>Wind: {item?.wind?.speed ?? "-"} km/h</p>
                                    <p>Description: {item?.weather?.[0]?.description || ""}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    );
                })
            }
        </Row>
        </Container>
    ) ;
}
export default Forecast;  
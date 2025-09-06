import { useEffect, useState } from "react";

function Home(){
    const [city,setCity] = useState("Hanoi"); // var city: city = "Hanoi"
    const [weather,setWeather] = useState(null);
    // const changeCity = (city)=>{
    //     setCity(city);
    // }
    useEffect(()=>{
        // sẽ chạy sau khi có sự thay đổi của state city
        console.log("Thành phố thay đổi: ",city);
        getWeather();
    },[city]); // gọi lại hàm mỗi khi city thay đổi => đây là 1 hàm lắng nghe (listener) sự thay đổi của state city

    // call API
    const getWeather = async ()=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=09a71427c59d38d6a34f89b47d75975c&units=metric`;
            const rs = await fetch(url);
            const data = await rs.json();
            if (data && data.name) {
                setCity(data.name);
            }
            setWeather(data);
        } catch (error) {
            
        }
    }

    // lắng nghe sự thay đổi của state sau khi render
    useEffect(()=>{
        console.log("Component đã được render");
        // gọi API lấy dữ liệu thời tiết 
        getWeather();
        // làm nhiều việc khác

    },[]); // hàm này chỉ chạy 1 lần sau khi render lần đầu tiên
    // tại sao phải lắng nghe sự thay đổi sau khi render/
    // vì sau khi render, giao diện đã có , ta có thể thao tác với giao diện
    // ví dụ; gọi API, thao tác với DOM. thiết lập các thư viện bên
    return(
        <div>
            <h1>Thời tiết tại {city}</h1>
            {weather ? (
                <>
                    <h2>Nhiệt độ: {weather.main?.temp}°C</h2>
                    <h2>Độ ẩm: {weather.main?.humidity}%</h2>
                    <h2>Tốc độ gió: {weather.wind?.speed}km/h</h2>
                    <h2>Mô tả: {weather.weather?.[0]?.description}</h2>
                    {weather.weather?.[0]?.icon && (
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
                    )}
                </>
            ) : (
                <p>Đang tải dữ liệu thời tiết...</p>
            )}
            <button onClick={()=>setCity("saigon")} variant="primary">HCM</button>
            <button onClick={()=>setCity("london")} variant="primary">London</button>
            <button onClick={()=>setCity("tokyo")} variant="primary">Tokyo</button>
            <button onClick={()=>setCity("hanoi")} variant="primary">HN</button>
            <button onClick={()=>setCity("halong")} variant="primary">HL</button>
        </div>
    )
};
export default Home;
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

function Category(){
    const {slug} = useParams();
    const [products,setProducts] = useState([]);
    const getProducts = async ()=>{
        try{
            const url = "https://dummyjson.com/products/category/"+slug;
            const rs = await fetch(url);
            if(!rs.ok){
                throw new Error("Failed to fetch category products");
            }
            const data = await rs.json();
            setProducts(data.products || []);
        }catch(err){
            console.error(err);
            setProducts([]);
        }
    }
    useEffect(()=>{
        getProducts();
    },[slug]);
    return (
        <div>
            <h1>Category Page: {slug}</h1>
            <Container>
                <Row>
                    {
                        products.map((e,i)=>{
                            return (
                                <Col key={i} xs={3} className="mb-3">
                                    <Link to={`/product/${e.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        <Card className="h-100">
                                            <Card.Img src={e.thumbnail}/>
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: "1rem", minHeight: 48 }}>{e.title}</Card.Title>
                                                <Card.Text style={{ fontWeight: "bold" }}>${e.price}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            );
                        })
                    }
                    
                    
                </Row>
            </Container>
        </div>
    )
};
export default Category;
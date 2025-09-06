import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Badge, Form } from "react-bootstrap";

function Product(){
    const {id} = useParams();
    const [products,setDetailProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const getDetailProduct = async ()=>{
        try{
            const url = `https://dummyjson.com/products/${id}`;
            const rs = await fetch(url);
            if(!rs.ok){
                throw new Error(`Failed to fetch product ${id}: ${rs.status}`);
            }
            const data = await rs.json();
            setDetailProduct(data);
            setSelectedImage(data?.thumbnail || data?.images?.[0] || "");
        }catch(err){
            console.error(err);
            setDetailProduct({});
        }
    }
    useEffect(()=>{
        getDetailProduct();
    },[id]);
    const formatPrice = (p)=>{
        if(p === undefined || p === null){
            return "";
        }
        return `$${Number(p).toFixed(2)}`;
    }

    const renderStars = (rating)=>{
        const full = Math.floor(rating || 0);
        const half = (rating || 0) - full >= 0.5;
        const empty = 5 - full - (half ? 1 : 0);
        const stars = [];
        for(let i=0;i<full;i++) stars.push(<i key={"f"+i} className="bi bi-star-fill text-warning"/>);
        if(half) stars.push(<i key="h" className="bi bi-star-half text-warning"/>);
        for(let i=0;i<empty;i++) stars.push(<i key={"e"+i} className="bi bi-star text-warning"/>);
        return stars;
    }

    return (
        <div>
            <Container>
                <Row className="mt-4">
                    <Col md={6} className="mb-3">
                        <Card className="mb-3">
                            {selectedImage ? (
                                <Card.Img src={selectedImage} alt={products.title}/>
                            ) : (
                                <div style={{height: 380}} className="d-flex align-items-center justify-content-center">No Image</div>
                            )}
                        </Card>
                        <Row>
                            {(products.images || []).slice(0,6).map((img, idx)=>(
                                <Col key={idx} xs={2} className="mb-2">
                                    <Card onClick={()=>setSelectedImage(img)} style={{cursor: "pointer", border: selectedImage===img? "2px solid #0d6efd":"1px solid #dee2e6"}}>
                                        <Card.Img src={img} alt={`thumb-${idx}`}/>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col md={6}>
                        <h2 className="mb-2">{products.title}</h2>
                        <div className="mb-2 d-flex align-items-center" style={{gap: 8}}>
                            <div>{renderStars(products.rating)}</div>
                            {products.rating ? <span>({products.rating})</span> : null}
                            {products.stock > 0 ? (
                                <Badge bg="success">In stock: {products.stock}</Badge>
                            ) : (
                                <Badge bg="secondary">Out of stock</Badge>
                            )}
                        </div>
                        <h3 className="text-danger mb-3">{formatPrice(products.price)}</h3>
                        <div className="mb-2"><strong>Brand:</strong> {products.brand}</div>
                        <div className="mb-3"><strong>Category:</strong> {products.category}</div>
                        <p className="text-muted" style={{whiteSpace: "pre-line"}}>{products.description}</p>

                        <div className="d-flex align-items-center mb-3" style={{gap: 12}}>
                            <Form.Label className="mb-0"><strong>Qty</strong></Form.Label>
                            <Form.Control
                                type="number"
                                value={quantity}
                                min={1}
                                max={products.stock || 99}
                                onChange={(e)=> setQuantity(Math.max(1, Math.min(Number(e.target.value)||1, products.stock||99)))}
                                style={{width: 90}}
                            />
                        </div>

                        <div className="d-flex" style={{gap: 12}}>
                            <Button variant="primary" disabled={products.stock === 0} onClick={()=>console.log("Add to cart", {id, quantity})}>Add to Cart</Button>
                            <Button variant="warning" disabled={products.stock === 0} onClick={()=>console.log("Buy now", {id, quantity})}>Buy Now</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Product;
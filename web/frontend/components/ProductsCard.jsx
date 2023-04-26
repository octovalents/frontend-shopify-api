import { ResourceList, TextStyle, Thumbnail } from '@shopify/polaris';
import { useState, useEffect } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

import "./ProductsCard.css"

export function ProductsCard() {
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetch = useAuthenticatedFetch();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                setProducts(data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
    
        fetchProducts();

        const items = products.map((product) => {
            return {
                id: product.id,
                src: product.image ? product.image.src : '',
                title: <TextStyle variation="strong">{product.title}</TextStyle>,
                desc: product.description,
            };
        });
        setItems(items);
    }, []);

    const resourceName = {
        singular: 'product',
        plural: 'products',
    };

    return (
        <ResourceList
            resourceName={resourceName}
            items={items}
            loading={isLoading}
            renderItem={(item) => {
                const { id, src, title, desc } = item;
                return (
                    <ResourceList.Item
                        id={id}
                    >
                        <div
                            className="oct-card oct-card-product">
                                <div className='oct-img-container'>
                                    <img src={src} alt={title}/>
                                </div>                           
                            <h2>{title}</h2>
                        </div>
                    </ResourceList.Item>
                );
            }}
        />
    );
}

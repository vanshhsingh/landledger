import { useParams } from "react-router-dom";
import propertyData from "./Dummy data/data.json";

export default function PropertyDetails() {
  const { id } = useParams();
  const propertyId = id ? parseInt(id.replace(/\D/g, ""), 10) : 0;
  const property = propertyData.find((p) => p.id === propertyId);

  if (!property) return <h2>Property Not Found</h2>;

  return (
    <div>
      <h2>{property.name}</h2>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Size:</strong> {property.size}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
    </div>
  );
}

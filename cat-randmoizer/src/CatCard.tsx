import { Card } from "react-bootstrap";
import { Cat } from "./App";

function CatCard({ url, description, id, country, weight, wiki, alt }: Cat) {
  return (
    <Card style={{ width: "54rem" }}>
      <Card.Img variant="top" src={url} alt={alt} width={256} height={330} />
      <Card.Body>
        <Card.Title>
          <h6>
            Breed - <i>{id}</i>
          </h6>
          <h6>
            Country - <i>{country}</i>
          </h6>
          <h6>
            Weight - <i>{weight}</i>
          </h6>
          <h6>
            Wikipedia Url - <i style={{ color: "blue" }}>{wiki}</i>
          </h6>
        </Card.Title>
        <Card.Text>
          <small>
            <i>{description}</i>
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CatCard;

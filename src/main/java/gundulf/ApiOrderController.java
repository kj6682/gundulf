package gundulf;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
class ApiOrderController {


    @Value("${API_ORDERS}")
    private String orders;

    @Value("${API_PRODUCTS}")
    private String products;


    @Autowired
    private RestTemplate restTemplate;


    @GetMapping("/orders/to/{producer}")
    ResponseEntity<String> prepareOrderList(@PathVariable String producer,
                                            @RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "0") int size) {


        try {

            Order[] o = restTemplate.getForObject(orders + "/to/" + producer, Order[].class);
            List<Order> listOrds = Arrays.asList(o);
            ResponseEntity response = new ResponseEntity(listOrds, HttpStatus.OK);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }


        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

    static class ProductDeserializer extends StdDeserializer<Order> {

        public ProductDeserializer() {
            this(null);
        }

        public ProductDeserializer(Class<?> vc) {
            super(vc);
        }

        @Override
        public Order deserialize(JsonParser parser, DeserializationContext deserializer) throws IOException{
            Order order = new Order();
            ObjectCodec codec = parser.getCodec();
            JsonNode node = codec.readTree(parser);

            // try catch block
            JsonNode jId = node.get("id");
            Long id = jId.asLong();
            order.setId(id);

            JsonNode jProduct = node.get("name");
            String product = jProduct.asText();
            order.setProduct(product);

            JsonNode jPieces = node.get("pieces");
            short pieces = (short)jPieces.asInt();
            order.setPieces(pieces);

            JsonNode jProducer = node.get("producer");
            String producer = jProducer.asText();
            order.setProducer(producer);

            return order;
        }
    }
}//:)

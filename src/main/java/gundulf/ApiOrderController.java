package gundulf;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
class ApiOrderController {

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_ORDERS}")
    private String orders;

    @Value("${API_PRODUCTS}")
    private String products;

    @GetMapping("/orders/from/{shop}/to/{producer}")
    ResponseEntity<String> prepareOrderList(@PathVariable String shop,
                                            @PathVariable String producer,
                                            @RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "0") int size) {


        try {

            List<Order> listOrds = getOrders(producer);

            List<Order> listProds = getOrdersFromProducts(producer);

            listOrds.addAll(listProds);

            ResponseEntity response = new ResponseEntity(listOrds, HttpStatus.OK);
            return response;
        } catch (Exception e) {
            System.out.println("something went wrong here");
        }


        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/orders/to/{producer}")
    ResponseEntity<String> prepareOrderList(@PathVariable String producer,
                                            @RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "0") int size) {


        try {

            List<Order> listOrds = getOrders(producer);

            ResponseEntity response = new ResponseEntity(listOrds, HttpStatus.OK);
            return response;
        } catch (Exception e) {
            System.out.println("something went wrong here");
        }


        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }

    private List<Order> getOrdersFromProducts(@PathVariable String producer) throws IOException {
        SimpleModule module = new SimpleModule(ProductDeserializer.class.getName(), new Version(1, 0, 0, null, null, null));
        module.addDeserializer(Order.class, new ProductDeserializer());
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        objectMapper.registerModule(module);

        String jsonProds = apiBouncer.get(products + "/" + producer).getBody();
        return objectMapper.readValue(jsonProds, new TypeReference<List<Order>>() {});
    }

    private List<Order> getOrders(@PathVariable String producer) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        String jsonOrders = apiBouncer.get(orders + "/to/" + producer).getBody();
        return objectMapper.readValue(jsonOrders, new TypeReference<List<Order>>() {});
    }


    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Order {

        private Long id;
        private String product;
        private short pieces;
        private String producer;

        @Override
        public String toString() {
            final StringBuilder sb = new StringBuilder("Order{");
            sb.append("id=").append(id);
            sb.append(", product='").append(product).append('\'');
            sb.append(", pieces=").append(pieces);
            sb.append(", producer='").append(producer).append('\'');
            sb.append('}');
            return sb.toString();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getProduct() {
            return product;
        }

        public void setProduct(String product) {
            this.product = product;
        }

        public short getPieces() {
            return pieces;
        }

        public void setPieces(short pieces) {
            this.pieces = pieces;
        }

        public String getProducer() {
            return producer;
        }

        public void setProducer(String producer) {
            this.producer = producer;
        }

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

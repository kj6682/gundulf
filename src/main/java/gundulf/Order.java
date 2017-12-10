package gundulf;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.kj6682.commons.LocalDateDeserializer;
import org.kj6682.commons.LocalDateSerializer;

import java.time.LocalDate;

/*
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
            e.printStackTrace();
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

*/

@JsonIgnoreProperties(ignoreUnknown = true)
class Order {

        private Long id;

        private String shop;
        private String producer;
        private String product;
        private short pieces;
        private Integer quantity;
        private short executed;

        @JsonSerialize(using = LocalDateSerializer.class)
        @JsonDeserialize(using = LocalDateDeserializer.class)
        private LocalDate created;

        @JsonSerialize(using = LocalDateSerializer.class)
        @JsonDeserialize(using = LocalDateDeserializer.class)
        private LocalDate deadline;

        private String status;


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

        public String getShop() {
            return shop;
        }

        public void setShop(String shop) {
            this.shop = shop;
        }

        public LocalDate getDeadline() {
            return deadline;
        }

        public void setDeadline(LocalDate deadline) {
            this.deadline = deadline;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public short getExecuted() {
            return executed;
        }

        public void setExecuted(short executed) {
            this.executed = executed;
        }

        public LocalDate getCreated() {
            return created;
        }

        public void setCreated(LocalDate created) {
            this.created = created;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
        @Override
        public String toString() {
            final StringBuilder sb = new StringBuilder("Order{");
            sb.append("id=").append(id);
            sb.append(", shop='").append(shop).append('\'');
            sb.append(", producer='").append(producer).append('\'');
            sb.append(", product='").append(product).append('\'');
            sb.append(", pieces=").append(pieces);
            sb.append(", quantity=").append(quantity);
            sb.append(", executed=").append(executed);
            sb.append(", created=").append(created);
            sb.append(", deadline=").append(deadline);
            sb.append(", status='").append(status).append('\'');
            sb.append('}');
            return sb.toString();
        }
    }

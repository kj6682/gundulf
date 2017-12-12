package gundulf;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.kj6682.commons.LocalDateDeserializer;
import org.kj6682.commons.LocalDateSerializer;

import java.time.LocalDate;


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

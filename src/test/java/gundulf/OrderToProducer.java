package gundulf;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;



import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by luigi on 12/07/2017.
 * <p>
 * TDD - use this test to define the ORDER model
 */
@RunWith(SpringRunner.class)
@JsonTest
public class OrderToProducer {

    File jsonMany;

    @Before
    public void setup() throws Exception {
        jsonMany = ResourceUtils.getFile("classpath:orders.json");
    }



    public void groupByQuantity() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        String jsonProductArray = new String(Files.readAllBytes(jsonMany.toPath()));
        System.out.println(jsonProductArray);

        List<Order> listProds = objectMapper.readValue(jsonProductArray, new TypeReference<List<Order>>() {
        });
        listProds.stream().forEach(System.out::println);

        Map<String, Integer> result = listProds
                .stream()
                .collect(groupingBy(
                        o -> o.getProduct() + o.getPieces(),
                        summingInt(Order::getQuantity)));

        assertThat(result.get("Baba1").equals(10));
        assertThat(result.get("Baba2").equals(20));
    }

    @Test
    public void orders2producer() throws Exception {

        //given orders(date, producer, product, pieces, quantity)

        //when api/order/to/{producer}
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        String jsonProductArray = new String(Files.readAllBytes(jsonMany.toPath()));

        List<Order> listProds = objectMapper.readValue(jsonProductArray, new TypeReference<List<Order>>() {});

        //then return orders(date, producer, product + '-' + pieces, sum(quantity)

        Map<String, Integer> result = listProds
                .stream()
                .collect(groupingBy(
                        o -> o.getProduct() + o.getPieces(),
                        summingInt(Order::getQuantity)));

        List<OrderSynthesis> s = listProds
                .stream()
                .map(orderConverter)
                .collect(Collectors.<OrderSynthesis> toList());
                ;
        s.forEach(System.out::println);

        Map<LocalDate, Map<String, Integer>> ordersByDeadlineAndProduct =
                s.stream()
                        .collect(groupingBy(OrderSynthesis::getDeadline,
                                            groupingBy(OrderSynthesis::getProduct, summingInt(OrderSynthesis::getQuantity))
                        ));

        System.out.println(ordersByDeadlineAndProduct);

        Map<LocalDate, Map<String, Integer>> niceTry =
                listProds.stream()
                        .collect(groupingBy(Order::getDeadline,
                                groupingBy(o -> o.getProduct() + o.getPieces(), summingInt(Order::getQuantity))
                        ));

        System.out.println(niceTry);

        String json = new ObjectMapper().writeValueAsString(niceTry);
        System.out.println(json);

    }

    Function<Order, OrderSynthesis> orderConverter =  new Function<Order, OrderSynthesis>() {

        public OrderSynthesis apply(Order o) {
            OrderSynthesis synthesis = new OrderSynthesis(o.getDeadline(), o.getProducer(), o.getProduct() + "-" + o.getPieces());
            synthesis.setQuantity(o.getQuantity());
            return synthesis;
        }
    };

    static class OrderSynthesis{


        LocalDate deadline;
        String producer;
        String product;
        Integer quantity;

        public OrderSynthesis(LocalDate deadline, String producer, String product) {
            this.deadline = deadline;
            this.producer = producer;
            this.product = product;
        }

        public LocalDate getDeadline() {
            return deadline;
        }

        public void setDeadline(LocalDate deadline) {
            this.deadline = deadline;
        }

        public String getProducer() {
            return producer;
        }

        public void setProducer(String producer) {
            this.producer = producer;
        }

        public String getProduct() {
            return product;
        }

        public void setProduct(String product) {
            this.product = product;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        @Override
        public String toString() {
            final StringBuilder sb = new StringBuilder("OrderSynthesis{");
            sb.append("deadline=").append(deadline);
            sb.append(", producer='").append(producer).append('\'');
            sb.append(", product='").append(product).append('\'');
            sb.append(", quantity=").append(quantity);
            sb.append('}');
            return sb.toString();
        }


    }//:)


    static public class SynthesisSerializer extends StdSerializer< Map<LocalDate, Map<String, Integer>> > {

        public SynthesisSerializer() {
            this(null);
        }

        public SynthesisSerializer(Class<Map<LocalDate, Map<String, Integer>>> t) {
            super(t);
        }

        @Override
        public void serialize(
                Map<LocalDate, Map<String, Integer>> value,
                JsonGenerator jgen,
                SerializerProvider provider)
                throws IOException, JsonProcessingException {

            jgen.writeStartObject();
            for( LocalDate d : value.keySet()){
                jgen.writeStringField("deadline", d.toString());
                jgen.writeArray(value.get(d));
            }
            jgen.writeStringField("deadline", value.keySet());
            jgen.writeStringField("itemName", value.itemName);
            jgen.writeNumberField("owner", value.owner.id);
            jgen.writeEndObject();
        }
    }

}//:)



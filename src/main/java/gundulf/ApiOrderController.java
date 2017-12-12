package gundulf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
class ApiOrderController {


    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_ORDERS}")
    private String orders;

    /**
     * ORDER-001 - the_producer_lists_the_orders
     * <p>
     * as a producer
     * I want to list all my order lines
     * so that I can facilitate dispatching the products
     */
    @GetMapping("/orders/to/{producer}")
    ResponseEntity<String> producerOrders(@PathVariable String producer) {

        return apiBouncer.get(orders + "/to/" + producer);

    }

    /**
     * ORDER-002 - the_producer_lists_the_daily_todo
     * <p>
     * as a producer
     * I want to get my todolist
     * so that I can facilitate my daily work
     * and possibly anticipate the future productions
     */
    @GetMapping("/orders/to/{producer}/group_by_product")
    ResponseEntity<String> producerTodos(@PathVariable String producer) {

        return apiBouncer.get(orders + "/to/" + producer + "group_by_product");

    }

    /**
     * ORDER-003 - the_shop_holder_lists_the_orders
     * <p>
     * as a shop holder
     * I want to list all my orders
     * so that I can track what I asked
     * and possibly validate returns
     */
    @GetMapping("/orders/from/{shop}")
    ResponseEntity<String> shopOrders(@PathVariable String shop) {

        return apiBouncer.get(orders + "/from/" + shop);

    }

    /**
     * ORDER-004 - the_shop_holder_list_the_products_to_place_orders
     * <p>
     * as a shop holder
     * I want to list all the products of a producer
     * so I can place an order on it
     * and possibly modify it
     */
    @GetMapping("/orders/from/{shop}/to/{producer}")
    ResponseEntity<String> prepareOrderList(@PathVariable String shop,
                                            @PathVariable String producer) {


        return apiBouncer.get(orders + "/from/" + shop +"/to/"+ producer);
    }


}//:)

package org.kj6682.gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_ORDERS}")
    private String orders;

    @Value("${API_TODOS}")
    private String todos;

    ResponseEntity<String> producerOrders(String producer) {

        return apiBouncer.get(orders + "/producer/" + producer);

    }

    ResponseEntity<String> producerTodos(String producer) {

        return apiBouncer.get(todos + "/producer/" + producer);

    }

    ResponseEntity<String> shopOrders(String shop) {

        return apiBouncer.get(orders + "/shop/" + shop);

    }

    ResponseEntity<String> dailyOrders(String shop, String producer) {

        final String restEndPointUrl = String.format("%s/%s/%s/%s",
                orders + "/shop/",
                shop,
                producer,
                LocalDate.now().plusDays(1).toString());

        return apiBouncer.get(restEndPointUrl);

    }

    ResponseEntity<?> create(String shop, String order) {

        return apiBouncer.post(orders + "/shop/" + shop, order);

    }


    ResponseEntity<?> update(String shop,
                             String id,
                             String order) {

        return apiBouncer.put(orders + "/shop/" + shop + "/" + id, order);

    }

    void delete(String shop,
                Long id) {

        apiBouncer.delete(orders + "/shop/" + shop + "/" + id);
    }
}

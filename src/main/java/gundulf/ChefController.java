package gundulf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class ChefController {

    @Value("${PROXY_PRODUCTS}")
    private String proxyProducts;
    @Value("${PROXY_ITEMS}")
    private String proxyItems;
    @Value("${PROXY_ORDERS}")
    private String proxyOrders;

    @RequestMapping("/four")
    public String oven(Model model) {
        return getModel(PRODUCER.OVEN, model);
    }

    @RequestMapping("/entremets")
    public String dessert(Model model) {
        return getModel(PRODUCER.DESSERT, model);
    }

    @RequestMapping("/tartes")
    public String cakes(Model model) {
        return getModel(PRODUCER.CAKES, model);
    }

    @RequestMapping("/chocolat")
    public String chocolat(Model model) {
        return getModel(PRODUCER.CHOCOLATE, model);
    }

    private String getModel(PRODUCER producer, Model model) {
        model.addAttribute("producer", producer.name);
        model.addAttribute("proxyProducts", proxyProducts);
        model.addAttribute("proxyItems", proxyItems);
        model.addAttribute("proxyOrders", proxyOrders);
        return "chef/index";
    }

    private enum PRODUCER {
        OVEN("four"), DESSERT("entremets"), CHOCOLATE("chocolat"), CAKES("tartes");

        private String name;

        PRODUCER(String name) {
            this.name = name;
        }

        String getName() {
            return this.name;
        }
    }
}
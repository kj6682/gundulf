package gundulf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
class BaseController {


    @Value("${PROXY_PRODUCTS}")
    private String proxyProducts;

    @Value("${PROXY_ITEMS}")
    private String proxyItems;

    @Value("${PROXY_ORDERS}")
    private String proxyOrders;

    @RequestMapping("/")
    public String main(Model model) {
        return "index";
    }

    @RequestMapping("/four")
    public String oven(Model model) {
        return getModel("Four", model);
    }

    @RequestMapping("/entremets")
    public String dessert( Model model) {
        return getModel("Entremets", model);
    }

    @RequestMapping("/tartes")
    public String cakes(Model model) {
        return getModel("Tartes", model);
    }

    @RequestMapping("/chocolat")
    public String chocolat(Model model) {
        return getModel("Chocolat", model);
    }

    private String getModel(String producer, Model model) {
        model.addAttribute("producer", producer);
        model.addAttribute("proxyProducts", proxyProducts);
        model.addAttribute("proxyItems", proxyItems);
        model.addAttribute("proxyOrders", proxyOrders);
        return "chef/index";
    }

    @RequestMapping("/orders")
    public String orders() {
        return "shop";
    }
}
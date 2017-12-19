package gundulf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class ShopController {

    @Value("${PROXY_ORDERS}")
    private String proxyOrders;

    @RequestMapping("/paris")
    public String paris(Model model) {
        return getModel(SHOP.PARIS, model);
    }

    @RequestMapping("/luxembourg")
    public String luxembourg(Model model) {
        return getModel(SHOP.LUXEMBOURG, model);
    }


    private String getModel(SHOP shop, Model model) {
        model.addAttribute("shop", shop.name);
        model.addAttribute("proxyOrders", proxyOrders);
        return "shop/index";
    }


    private enum SHOP {
        PARIS("paris"), LUXEMBOURG("luxembourg");

        private String name;

        SHOP(String name) {
            this.name = name;
        }

        String getName() {
            return this.name;
        }
    }
}
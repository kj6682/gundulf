package gundulf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class ChefController {

    @Value("${API_ROOT}")
    private String api_root;

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
        model.addAttribute("root", api_root);
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
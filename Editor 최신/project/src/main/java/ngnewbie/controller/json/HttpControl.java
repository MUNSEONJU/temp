//찾는부분
package ngnewbie.controller.json;

import java.util.HashMap;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/json")
public class HttpControl {
  static Logger logger = Logger.getLogger(HttpControl.class);
  
  @RequestMapping("/sample") 
  public Object view() throws Exception {
    HashMap<String,Object> result = new HashMap<String,Object>();
    
    result.put("userName", "ngnewbie");
    result.put("userEmail", "ngnewbie@ng.com");
    
    return result;
  }
  
}
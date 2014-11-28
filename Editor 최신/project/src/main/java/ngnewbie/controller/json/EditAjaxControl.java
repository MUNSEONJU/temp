//찾는부분
package ngnewbie.controller.json;

import java.util.HashMap;

import ngnewbie.service.NgnewbieService;
import ngnewbie.vo.Ngnewbie;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/edit")
public class EditAjaxControl {
  static Logger logger = Logger.getLogger(EditAjaxControl.class);
  
  @Autowired
  NgnewbieService ngnewbieService;
  
  @RequestMapping(value="{urlhash}", method=RequestMethod.POST) 
  public Object view(@PathVariable String urlhash) throws Exception {
    logger.warn(urlhash+" 목록 가져오기.....");
    HashMap<String,Object> result = new HashMap<String,Object>();
    
    logger.warn(urlhash);
    
    Ngnewbie ngnewbie = ngnewbieService.select(urlhash);
    
    logger.warn(ngnewbie);
    
    if(ngnewbie == null) {
      result.put("status", "success");
      
      logger.warn("db에 값이 없음");
      
      return result;
    }
    else {
      result.put("config", ngnewbie.getConfig());
      result.put("html", ngnewbie.getHtml());
      result.put("js", ngnewbie.getJs());
      
      logger.warn("Dao에서 "+urlhash+" 가져오기");
      
      return result;
    }
  }
  
  
  
}
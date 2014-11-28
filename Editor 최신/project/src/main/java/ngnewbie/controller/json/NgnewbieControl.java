package ngnewbie.controller.json;

//더하는 부분
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
@RequestMapping("/ngnewbie")
public class NgnewbieControl {
  static Logger logger = Logger.getLogger(NgnewbieControl.class);
  
  @Autowired
  NgnewbieService ngnewbieService;
  
  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object add(Ngnewbie ngnewbie) throws Exception {
    logger.warn("등록.....");
    
    HashMap<String,Object> result = new HashMap<String,Object>();
    
    String urlhash = ngnewbie.getUrlhash();
    Ngnewbie check = ngnewbieService.select(urlhash);
    
    if(check == null){
      logger.warn("db에 중복되는 값 없음");
      
      ngnewbieService.insert(ngnewbie);
      
      //logger.warn(ngbot.getConfig());
      
      result.put("urlhash", ngnewbie.getUrlhash());
      result.put("config", ngnewbie.getConfig());
      result.put("html", ngnewbie.getHtml());
      result.put("js", ngnewbie.getJs());
      result.put("status", "success");
      
      logger.warn("Dao에 add추가");
      
      return result;
    }
    else {
      result.put("status", "faild");
      
      logger.warn("중복....");
      
      return result;
    }
  }
  
  @RequestMapping(value="{urlhash}", method=RequestMethod.POST) 
  public Object exview(@PathVariable String urlhash) throws Exception {
    logger.warn(urlhash+" 목록 가져오기.....");
    HashMap<String,Object> result = new HashMap<String,Object>();
    
    logger.warn(urlhash);
    
    Ngnewbie ngnewbie = ngnewbieService.select(urlhash);
    
    logger.warn(ngnewbie);
    
    result.put("urlhash", ngnewbie.getUrlhash());
    result.put("config", ngnewbie.getConfig());
    result.put("html", ngnewbie.getHtml());
    result.put("js", ngnewbie.getJs());
    
    logger.warn("Dao에서 "+urlhash+" 가져오기");
    
    return result;
  }
}
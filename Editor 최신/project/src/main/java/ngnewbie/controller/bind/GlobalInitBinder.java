package ngnewbie.controller.bind;

import java.text.SimpleDateFormat;

import org.apache.log4j.Logger;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

/* @ControllerAdvice
 * => 페이지 컨트롤러에게 요청을 처리할 때 필요한 충고를 제공
 * => 예) 문자열을 java.util.Date 객체로 바꿀 때는 CustomDateEditor를 사용하라! 등의 충고.
 * => 이 애노테이션을 동작시키려면 <mvc:annotation-driven/> 선언이 필요.
 */

@ControllerAdvice
public class GlobalInitBinder {
  static Logger logger = Logger.getLogger(GlobalInitBinder.class);
  
  /* @InitBinder
   * => 요청 핸들러를 호출하기 전에 수행되는 메서드임을 선언.
   */
  @InitBinder
  public void initBinder(WebDataBinder binder) {
    logger.debug("GlobalInitBinder의 initBinder() 호출됨");
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    CustomDateEditor customDateEditor = new CustomDateEditor(
        dateFormat, /* 요청 정보의 문자열 형식 지정*/ 
        true /* 빈 문자열 허용 여부 */);
    
    binder.registerCustomEditor(
        java.util.Date.class, /* 문자열을 어떤 타입의 값으로 바꿀지 지정한다.*/ 
        customDateEditor /* 커스텀 에디터 객체를 지정한다*/);
  }
}

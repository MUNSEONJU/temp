package ngnewbie.service;

import ngnewbie.dao.NgnewbieDao;
import ngnewbie.vo.Ngnewbie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NgnewbieServicempl implements NgnewbieService{

  @Autowired
  NgnewbieDao ngnewbieDao;
  
  @Override
  public void insert(Ngnewbie ngbot) throws Exception {
    ngnewbieDao.insert(ngbot);
    
  }

  @Override
  public Ngnewbie select(String urlhash) throws Exception {
    return ngnewbieDao.select(urlhash);
  }

}

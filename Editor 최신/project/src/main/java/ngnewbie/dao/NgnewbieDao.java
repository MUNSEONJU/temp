package ngnewbie.dao;

import ngnewbie.vo.Ngnewbie;

public interface NgnewbieDao {
  int insert(Ngnewbie ngbot) throws Exception;
  Ngnewbie select(String urlhash) throws Exception;
}


package com.formiga.repository;

import com.formiga.entity.MenuItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMenuItemRepository extends JpaRepository<MenuItem, Long>{
    
    public List<MenuItem> findByMenuId(Long id);
    
}

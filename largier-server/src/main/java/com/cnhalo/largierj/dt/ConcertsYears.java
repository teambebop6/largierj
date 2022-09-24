package com.cnhalo.largierj.dt;

import com.cnhalo.largierj.model.Concert;
import java.util.List;
import java.util.Map;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Data
public class ConcertsYears {

    private List<String> years;
    private Map<String, List<Concert>> concerts;

}

package com.cnhalo.largierj.dt;

import com.cnhalo.largierj.model.Concert;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Data
@AllArgsConstructor
public class ConcertGroups {

    private List<Concert> upcoming_concerts;
    private List<Concert> past_concerts;

}

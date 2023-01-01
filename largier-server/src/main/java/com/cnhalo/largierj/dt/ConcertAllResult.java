package com.cnhalo.largierj.dt;

import com.cnhalo.largierj.model.Concert;
import java.util.List;
import lombok.Data;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@Data
public class ConcertAllResult {

    private List<Event> upcoming_concerts;
    private ConcertsYears past_concerts;

}

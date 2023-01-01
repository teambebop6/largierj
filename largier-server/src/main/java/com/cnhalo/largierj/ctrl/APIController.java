package com.cnhalo.largierj.ctrl;

import com.cnhalo.largierj.config.DBBasedConfig;
import com.cnhalo.largierj.dt.ConcertAllResult;
import com.cnhalo.largierj.dt.ConcertGroups;
import com.cnhalo.largierj.dt.ConcertsYears;
import com.cnhalo.largierj.dt.Event;
import com.cnhalo.largierj.dt.Result;
import com.cnhalo.largierj.repository.ConcertRepository;
import com.cnhalo.largierj.service.AdminService;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Henry Huang on 2022/9/19.
 */
@RestController
@RequestMapping("/api")
public class APIController {

    @Autowired
    ConcertRepository concertRepository;

    @Autowired
    AdminService adminService;

    @Autowired
    DBBasedConfig dbBasedConfig;

    @GetMapping({"/concerts"})
    public Result<ConcertGroups> findConcertGroups() {

        List<Event> past = adminService.toEvents(concertRepository.findAllByDateLessThanAndVisibleEqualsOrderByDateDesc(PageRequest.of(0, dbBasedConfig.getPastConcertNum()), getDateOnlyDate(), true));
        List<Event> upcoming = adminService.toEvents(concertRepository.findAllByDateGreaterThanEqualAndVisibleEqualsOrderByDateAsc(PageRequest.of(0, dbBasedConfig.getUpcomingConcertNum()), getDateOnlyDate(), true));

        return Result.ok(new ConcertGroups(upcoming, past));
    }

    @GetMapping({"/concerts/all"})
    public Result<ConcertAllResult> findConcertAllResult() {

        List<Event> upcoming = adminService.toEvents(concertRepository.findAllByDateGreaterThanEqualAndVisibleEqualsOrderByDateAsc(null, getDateOnlyDate(), true));

        List<Event> past = adminService.toEvents(concertRepository.findAllByDateLessThanAndVisibleEqualsOrderByDateDesc(null, getDateOnlyDate(), true));

        ConcertAllResult concertAllResult = new ConcertAllResult();
        concertAllResult.setUpcoming_concerts(upcoming);

        concertAllResult.setPast_concerts(getConcertsYears(past));
        return Result.ok(concertAllResult);
    }

    private Date getDateOnlyDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        return calendar.getTime();
    }

    private ConcertsYears getConcertsYears(List<Event> past) {
        List<Date> years = new ArrayList<>();
        List<String> yearStrings = new ArrayList<>();
        Map<String, List<Event>> concerts = new HashMap<>();
        for (Event event : past) {
            String fullYear = getFullYear(event.getDate());
            if (!yearStrings.contains(fullYear)) {
                years.add(event.getDate());
                yearStrings.add(fullYear);
            }
            List<Event> list = concerts.computeIfAbsent(fullYear, k -> new ArrayList<>());
            list.add(event);
        }
        Collections.sort(years);
        ConcertsYears concertsYears = new ConcertsYears();
        concertsYears.setConcerts(concerts);
        concertsYears.setYears(years.stream().map(APIController::getFullYear).collect(Collectors.toList()));
        return concertsYears;
    }

    private static String getFullYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return String.valueOf(calendar.get(Calendar.YEAR));
    }

}

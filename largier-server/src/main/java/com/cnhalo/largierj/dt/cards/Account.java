package com.cnhalo.largierj.dt.cards;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;
import lombok.ToString;

/**
 * Created by Henry Huang on 2023/1/3.
 */
@Data
@ToString
@JsonInclude(Include.NON_NULL)
public class Account {

    private String name;
    private String type;
    private String title;
    private String remark;
    private int billDate;
    private RepaymentDateInfo repaymentDate;
    private PaymentMethod paymentMethod;
    private Boolean half;
    private Boolean swipe;
    private Integer order;

}

package org.tiatus.service;

import javax.jms.JMSException;

/**
 * Created by johnreynolds on 06/04/2017.
 */
public interface MessageSenderService {
    void sendMessage(final Message obj) throws JMSException;
}

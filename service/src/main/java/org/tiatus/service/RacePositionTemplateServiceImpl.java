package org.tiatus.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tiatus.dao.DaoException;
import org.tiatus.dao.RacePositionTemplateDao;
import org.tiatus.entity.RacePositionTemplate;
import org.tiatus.entity.RacePositionTemplateEntry;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by johnreynolds on 09/03/2017.
 */
public class RacePositionTemplateServiceImpl implements RacePositionTemplateService {
    private static final Logger LOG = LoggerFactory.getLogger(RacePositionTemplateServiceImpl.class);

    private final RacePositionTemplateDao dao;

    /**
     * Constructor for service
     * @param dao object injected by cdi
     */
    @Inject
    public RacePositionTemplateServiceImpl(RacePositionTemplateDao dao) {
        this.dao = dao;
    }

    @Override
    public RacePositionTemplate addRacePositionTemplate(RacePositionTemplate template) throws ServiceException {
        LOG.debug("Adding template " + template.getName());
        try {
            return dao.addRacePositionTemplate(template);

        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public void deleteRacePositionTemplate(RacePositionTemplate template) throws ServiceException {
        LOG.debug("Delete template " + template.getId());
        try {
            dao.deleteRacePositionTemplate(template);
        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public void updateRacePositionTemplate(RacePositionTemplate template) throws ServiceException {
        LOG.debug("Update template " + template.getId());
        try {
            dao.updateRacePositionTemplate(template);
        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public List<RacePositionTemplate> getRacePositionTemplates() {
        return dao.getRacePositionTemplates();
    }

    @Override
    public RacePositionTemplate getTemplateForId(Long id) {
        return dao.getTemplateForId(id);
    }

    @Override
    public RacePositionTemplateEntry addTemplateEntry(RacePositionTemplateEntry entry) throws ServiceException {
        try {
            return dao.addTemplateEntry(entry);
        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public void deleteTemplateEntry(RacePositionTemplateEntry entry) throws ServiceException {
        try {
            dao.deleteTemplateEntry(entry);
        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public void updateTemplateEntry(RacePositionTemplateEntry entry) throws ServiceException {
        try {
            dao.updateTemplateEntry(entry);
        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }
}
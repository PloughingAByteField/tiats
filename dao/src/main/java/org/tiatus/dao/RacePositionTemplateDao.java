package org.tiatus.dao;

import org.tiatus.entity.RacePositionTemplate;

import java.util.List;

/**
 * Created by johnreynolds on 10/10/2016.
 */
public interface RacePositionTemplateDao {
    /**
     * Add a RaceEvent
     *
     * @param template RacePositionTemplate to create
     * @return created RacePositionTemplate
     * @throws DaoException on error
     */
    RacePositionTemplate addRacePositionTemplate(RacePositionTemplate template) throws DaoException;

    /**
     * Remove a RacePositionTemplate
     *
     * @param template RacePositionTemplate to remove
     * @throws DaoException on error
     */
    void deleteRacePositionTemplate(RacePositionTemplate template) throws DaoException;

    /**
     * Update a RacePositionTemplate
     * @param template RacePositionTemplate to update
     * @throws DaoException on error
     */
    void updateRacePositionTemplate(RacePositionTemplate template) throws DaoException;

    /**
     * Get list of RaceEvents
     *
     * @return list of race position templates
     */
    List<RacePositionTemplate> getRacePositionTemplates();

}
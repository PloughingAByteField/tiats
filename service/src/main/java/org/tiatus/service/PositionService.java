package org.tiatus.service;

import org.tiatus.entity.Position;

import java.util.List;

/**
 * Created by johnreynolds on 25/06/2016.
 */
public interface PositionService {
    /**
     * Get Position for a given id
     * @return Position or null
     */
    Position getPositionForId(Long id);

    /**
     * Get Positions
     * @return a list of Positions
     */
    List<Position> getPositions();

    /**
     * Add a new Position
     * @param position Position to add
     * @return Position Added race
     * @throws ServiceException on error
     */
    Position addPosition(Position position, String sessionId) throws ServiceException;

    /**
     * Remove a Position
     * @param position Position to remove
     * @throws ServiceException on error
     */
    void removePosition(Position position, String sessionId) throws ServiceException;

    /**
     * Update a Position
     * @param position Position to update
     * @throws ServiceException on error
     */
    void updatePosition(Position position, String sessionId) throws ServiceException;
}

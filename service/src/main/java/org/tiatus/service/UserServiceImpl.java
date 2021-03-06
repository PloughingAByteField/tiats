package org.tiatus.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tiatus.dao.DaoException;
import org.tiatus.dao.UserDao;
import org.tiatus.entity.Role;
import org.tiatus.entity.User;
import org.tiatus.entity.UserRole;

import javax.inject.Inject;
import javax.jms.JMSException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by johnreynolds on 02/09/2016.
 */
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserDao dao = null;
    private MessageSenderService sender;

    /**
     * Constructor for service
     * @param dao is injected by CDI
     */
    @Inject
    public UserServiceImpl(UserDao dao, MessageSenderService sender) {
        this.dao = dao;
        this.sender = sender;
    }

    @Override
    public boolean hasAdminUser() {
        return dao.hasAdminUser();
    }

    @Override
    public User addAdminUser(User user, String sessionId) throws ServiceException {
        // do we have an existing user
        if (hasAdminUser()) {
            LOG.warn("Already have an admin user ");
            throw new ServiceException("Existing user");
        }

        LOG.debug("Adding admin user " + user.getUserName());
        try {
            UserRole userRole = new UserRole();
            // get role for admin from db
            Role role = dao.getRoleForRole(org.tiatus.role.Role.ADMIN);
            userRole.setRole(role);
            userRole.setUser(user);
            Set<UserRole> userRoleList = new HashSet<>();
            userRoleList.add(userRole);
            user.setRoles(userRoleList);
            return dao.addUser(user);

        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public User addUser(User user, String sessionId) throws ServiceException {
        LOG.debug("Adding user " + user.getUserName());
        try {
            User daoUser = dao.addUser(user);
            Message message = Message.createMessage(daoUser, MessageType.ADD, sessionId);
            sender.sendMessage(message);
            return daoUser;

        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        } catch (JMSException e) {
            LOG.warn("Got jms exception", e);
            throw new ServiceException(e);
        }
    }

    @Override
    public void deleteUser(User user, String sessionId) throws ServiceException {
        try {
            dao.deleteUser(user);
            Message message = Message.createMessage(user, MessageType.DELETE, sessionId);
            sender.sendMessage(message);

        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        } catch (JMSException e) {
            LOG.warn("Got jms exception", e);
            throw new ServiceException(e);
        }
    }

    @Override
    public void updateUser(User user, String sessionId) throws ServiceException {
        try {
            dao.updateUser(user);
            Message message = Message.createMessage(user, MessageType.UPDATE, sessionId);
            sender.sendMessage(message);

        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        } catch (JMSException e) {
            LOG.warn("Got jms exception", e);
            throw new ServiceException(e);
        }
    }

    @Override
    public User getUser(String userName, String password) {
        return dao.getUser(userName, password);
    }

    @Override
    public List<User> getUsers() throws ServiceException {
        try {
            return dao.getUsers();

        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public List<Role> getUserRoles() throws ServiceException {
        try {
            return dao.getUserRoles();

        } catch (DaoException e) {
            LOG.warn("Got dao exception");
            throw new ServiceException(e);
        }
    }

    @Override
    public User getUserForId(Long id) {
        return dao.getUserForId(id);
    }


}

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `task`;


SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255)
);

  CREATE TABLE task (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      assigned_employee_id BIGINT,
      FOREIGN KEY (assigned_employee_id) REFERENCES Employee(id) ON DELETE SET NULL
  );



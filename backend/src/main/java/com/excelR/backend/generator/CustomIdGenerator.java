package com.excelR.backend.generator;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

public class CustomIdGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        try {
            // Identify entity type dynamically
            String entityName = obj.getClass().getSimpleName();
            String prefix = getPrefixForEntity(entityName);

            // Query to find last generated ID
            String query = "SELECT id FROM " + entityName + " ORDER BY id DESC";
            String lastId = (String) session.createQuery(query)
                    .setMaxResults(1)
                    .uniqueResult();

            int nextId = 1;
            if (lastId != null && lastId.startsWith(prefix)) {
                String numberPart = lastId.substring(prefix.length());
                nextId = Integer.parseInt(numberPart) + 1;
            }

            return String.format("%s%03d", prefix, nextId);
        } catch (Exception e) {
            e.printStackTrace();
            return "ERR000"; // fallback in case of error
        }
    }

    private String getPrefixForEntity(String entityName) {
        // Define only Student and Instructor prefixes
        return switch (entityName) {
            case "Student" -> "2025RGVSAED";
            case "Instructor" -> "2025RGVINS";
            default -> "2025RGVGEN"; // fallback prefix (in case)
        };
    }
}

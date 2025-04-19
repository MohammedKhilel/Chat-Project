# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

ARG JAR_FILE=target/*.jar


# Copy the executable JAR file into the container
COPY target/Chat-0.0.1-SNAPSHOT.jar /Chat.jar

EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "Chat.jar"]

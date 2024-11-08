# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR file into the container
COPY target/Chat-0.0.1-SNAPSHOT.jar /Chat.jar

# Run the JAR file
ENTRYPOINT ["java", "-jar", "Chat.jar"]
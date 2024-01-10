# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory
WORKDIR /flask

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install the required Python packages
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Grant execute permissions to the start.sh script
RUN chmod +x start.sh

# Expose the port that your Flask app listens on
EXPOSE 5000

# Start the Flask app using the start.sh script
CMD ["./start.sh"]

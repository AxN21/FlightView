# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the shared module files into the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set the default command to run Alembic migrations
CMD ["alembic", "upgrade", "head"]

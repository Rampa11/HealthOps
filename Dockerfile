# ============================================================
# Stage 1: Build React frontend
# ============================================================
FROM node:22-alpine AS frontend-builder

WORKDIR /frontend

COPY healthcare-frontend/package*.json ./

RUN npm ci

COPY healthcare-frontend/ ./

RUN npm run build


# ============================================================
# Stage 2: Final HealthOpz container
# React + Nginx + FastAPI
# ============================================================
FROM nginx:alpine

# Install Python and Supervisor
RUN apk add --no-cache \
    python3 \
    py3-pip \
    supervisor

WORKDIR /app

# ------------------------------------------------------------
# Python dependencies
# ------------------------------------------------------------
COPY Backend/requirements.txt /app/requirements.txt

RUN pip3 install --no-cache-dir --break-system-packages \
    -r /app/requirements.txt

# ------------------------------------------------------------
# FastAPI application
# ------------------------------------------------------------
COPY Backend/app /app/app

# ------------------------------------------------------------
# React production build
# ------------------------------------------------------------
COPY --from=frontend-builder /frontend/dist /usr/share/nginx/html

# ------------------------------------------------------------
# Nginx configuration
# ------------------------------------------------------------
COPY healthcare-frontend/nginx.conf /etc/nginx/conf.d/default.conf

# ------------------------------------------------------------
# Supervisor configuration
# ------------------------------------------------------------
COPY supervisord.conf /etc/supervisord.conf

# Render expects the web service to listen on this port
EXPOSE 10000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
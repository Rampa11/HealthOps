from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError, ExpiredSignatureError

from app.core.security import SECRET_KEY, ALGORITHM

security = HTTPBearer()


# 🔐 GET CURRENT USER FROM TOKEN
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if (
            not payload.get("tenant_id")
            or not payload.get("role")
            or not payload.get("user_id") and not payload.get("patient_id")
        ):
            raise HTTPException(status_code=401, detail="Invalid token payload")

        return payload

    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# 🔴 ADMIN ONLY
def require_admin(user=Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


# 🟡 STAFF + ADMIN
def require_staff(user=Depends(get_current_user)):
    if user.get("role") not in ["admin", "staff"]:
        raise HTTPException(status_code=403, detail="Staff access required")
    return user


# 🟢 NURSE ONLY
def require_nurse(user=Depends(get_current_user)):
    if user.get("role") != "nurse":
        raise HTTPException(status_code=403, detail="Nurse access required")
    return user


# 🩺 DOCTOR ONLY
def require_doctor(user=Depends(get_current_user)):
    if user.get("role") != "doctor":
        raise HTTPException(status_code=403, detail="Doctor access required")
    return user


# 🟡 ADMIN + STAFF + DOCTOR (for shared clinical views)
def require_clinical(user=Depends(get_current_user)):
    if user.get("role") not in ["admin", "staff", "doctor"]:
        raise HTTPException(status_code=403, detail="Clinical access required")
    return user

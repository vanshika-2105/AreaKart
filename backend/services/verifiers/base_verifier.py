from abc import ABC, abstractmethod


class BaseVerifier(ABC):

    @abstractmethod
    def verify(self, pincode: str, latitude: float, longitude: float):
        """
        Verify whether a delivery service is available
        at the given location.

        Returns:
            dict containing:
            - status
            - confidence
            - message
        """
        pass